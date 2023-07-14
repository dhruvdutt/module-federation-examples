const React = require('react');
const createMatcher = require('feather-route-matcher');
const { injectScript } = require('@module-federation/nextjs-mf/utils');
const remoteVars = process.env.REMOTES || {};
const remotes = Object.entries(remoteVars).reduce((acc, item) => {
  const [key, value] = item;
  if (typeof value !== 'string') {
    acc[key] = {
      global: value,
    };
    return acc;
  }
  const [global, url] = value.split('@');

  acc[key] = {
    url,
    global,
  };
  return acc;
}, {});

async function matchFederatedPage(path) {
  const remotesToLoad = ['home'];
  if (path.startsWith("/transactions")) {
    remotesToLoad.push('transactions')
  }
  if (path.startsWith("/checkout") || path.startsWith("/dashboard")) {
    remotesToLoad.push('checkout')
  }
  if (path.startsWith("/shop")) {
    remotesToLoad.push('shop')
  }
  
  console.log('@matchFederatedPage remotes :', remotesToLoad);
  const maps = await Promise.all(
    remotesToLoad.map(async remote => {
      const foundContainer = injectScript(remote);
      const container = await foundContainer;
      
      return container
      .get('./pages-map')
      .then(factory => ({ remote, config: factory().default }))
      .catch(() => null);
    }),
    );

  const config = {};

  for (const map of maps) {
    if (!map) continue;

    for (let [path, mod] of Object.entries(map.config)) {
      config[path] = {
        remote: map.remote,
        module: mod,
      };
    }
  }

  console.log(config);
  const matcher = createMatcher.default(config);
  return matcher(path);
};


module.exports = {
  matchFederatedPage,
  createFederatedCatchAll(params) {
    console.log('@createFederatedCatchAll params :', params);
    const FederatedCatchAll = initialProps => {
      const [lazyProps, setProps] = React.useState({});

      const { FederatedPage, render404, renderError, needsReload, ...props } = {
        ...lazyProps,
        ...initialProps,
      };
      React.useEffect(() => {
        if (needsReload) {
          const runUnderlayingGIP = async () => {
            const federatedProps = await FederatedCatchAll.getInitialProps(props);
            setProps(federatedProps);
          };
          runUnderlayingGIP();
        }
      }, []);

      if (render404) {
        // TODO: Render 404 page
        return React.createElement('h1', {}, '404 Not Found');
      }
      if (renderError) {
        // TODO: Render error page
        return React.createElement('h1', {}, 'Oops, something went wrong.');
      }

      if (FederatedPage) {
        console.log('@FederatedPage createElement :', FederatedPage, props);
        return React.createElement(FederatedPage, {
          ...props,
          key: Date.now(),
        });
      }

      return null;
    };

    FederatedCatchAll.getInitialProps = async ctx => {
      // Bot marks "req, res, AppTree" as unused but those are vital to not get circular-dependency error
      const { err, req, res, AppTree, ...props } = ctx;
      if (err) {
        // TODO: Run getInitialProps for error page
        return { renderError: true, ...props };
      }
      if (!process.browser) {
        return { needsReload: true, ...props };
      }

      console.log('in browser', ctx);
      const matchedPage = await matchFederatedPage(ctx.asPath);

      try {
        console.log('matchedPage', matchedPage);
        const remote = matchedPage?.value?.remote;
        const mod = matchedPage?.value?.module;

        if (!remote || !mod) {
          // TODO: Run getInitialProps for 404 page
          return { render404: true, ...props };
        }

        console.log('loading exposed module', mod, 'from remote', remote);
        const container = await injectScript(remote);
        const FederatedPage = await container.get(mod).then(factory => factory().default);
        console.log('FederatedPage', FederatedPage);
        if (!FederatedPage) {
          // TODO: Run getInitialProps for 404 page
          return { render404: true, ...props };
        }

        const modifiedContext = {
          ...ctx,
          query: matchedPage.params,
        };
        const federatedPageProps = (await FederatedPage.getInitialProps?.(modifiedContext)) || {};
        return { ...federatedPageProps, FederatedPage };
      } catch (err) {
        console.log('err', err);
        // TODO: Run getInitialProps for error page
        return { renderError: true, ...props };
      }
    };

    return FederatedCatchAll;
  }
}

