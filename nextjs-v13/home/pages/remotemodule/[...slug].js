import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
const RemoteContainer = process.browser ? React.lazy(() => import('checkout/routerEntry')) : () => null;

function RemoteModule() {
    const [isClient, setIsClient] = React.useState(false)
    const router = useRouter()

    React.useEffect(() => {
        setIsClient(true)
    }, [])

    useEffect(() => {
        console.log('Shell - Next Router Updated', router.asPath);
    }, [router]);

    return (
        <div>
            RemoteModule - Host/NextJS
            {isClient ? <RemoteContainer nextRouter={router} /> : null}
        </div>
    )
}

export default RemoteModule