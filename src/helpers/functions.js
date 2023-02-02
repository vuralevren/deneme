export function generateUrl(link, subdomain = "app") {
  return `http://${subdomain}.${process.env.REACT_APP_PUBLIC_DOMAIN}/${link}`;
}
