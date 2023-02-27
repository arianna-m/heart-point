import '@/styles/globals.css'
import "tailwindcss/tailwind.css";
import {NotificationsProvider} from "@mantine/notifications";
import {MantineProvider} from '@mantine/core';
import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }) {
    return (
        <ThemeProvider>
            <MantineProvider>
                <NotificationsProvider>
                    <Component {...pageProps} />
                </NotificationsProvider>
            </MantineProvider>
        </ThemeProvider>
    )
}

export default MyApp
