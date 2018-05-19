/**
 *
 * @param {string} url
 * @returns {string}
 */
export function extractHostname(url: string) {

    let hostname: string;

    if (url.indexOf("://") > -1) {
        hostname = url.split('/')[2];
    } else {
        hostname = url.split('/')[0];
    }

    hostname = hostname.split(':')[0];
    hostname = hostname.split('?')[0];

    return hostname;
}
