import '../styles/style.less';

let isLightSelected = false;
if (typeof window !== 'undefined') {
  isLightSelected = localStorage.getItem('theme') === 'light';
  if (isLightSelected) {
    document.documentElement.classList.add('light');
  }
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
