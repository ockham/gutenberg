/**
 * WordPress dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs, prependHTTP } from '@wordpress/url';

/**
 * A simple in-memory cache for requests.
 * This avoids repeat HTTP requests which may be beneficial
 * for those wishing to preserve low-bandwidth.
 */
const CACHE = new Map();

/**
 * @typedef WPRemoteUrlData
 *
 * @property {string} title contents of the remote URL's `<title>` tag.
 */

/**
 * Fetches data about a remote URL.
 * eg: <title> tag, favicon...etc.
 *
 * @async
 * @param {string}  url     the URL to request details from.
 * @param {Object?} options any options to pass to the underlying fetch.
 * @example
 * ```js
 * import { __experimentalFetchRemoteUrlData as fetchRemoteUrlData } from '@wordpress/core-data';
 *
 * //...
 *
 * export function initialize( id, settings ) {
 *
 * settings.__experimentalFetchRemoteUrlData = (
 * url
 * ) => fetchRemoteUrlData( url );
 * ```
 * @return {Promise< WPRemoteUrlData[] >} Remote URL data.
 */
const fetchRemoteUrlData = async ( url, options = {} ) => {
	const endpoint = '/__experimental/url-details';

	const args = {
		url: prependHTTP( url ),
	};

	if ( CACHE.has( url ) ) {
		return CACHE.get( url );
	}

	return apiFetch( {
		path: addQueryArgs( endpoint, args ),
		...options,
	} ).then( ( res ) => {
		CACHE.set( url, res );
		return res;
	} );
};

export default fetchRemoteUrlData;
