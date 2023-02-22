import '@/styles/globals.css'
import "tailwindcss/tailwind.css";
import {NotificationsProvider} from "@mantine/notifications";
import {MantineProvider} from '@mantine/core';

function MyApp({ Component, pageProps }) {
    return (
        <MantineProvider>
            <NotificationsProvider>
                <Component {...pageProps} /> 
            </NotificationsProvider>
        </MantineProvider>
    )
}

export default MyApp
