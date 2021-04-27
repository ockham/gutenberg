/**
 * WordPress dependencies
 */
import { __, _x } from '@wordpress/i18n';
import { pullquote as icon } from '@wordpress/icons';

/**
 * Internal dependencies
 */
import deprecated from './deprecated';
import edit from './edit';
import metadata from './block.json';
import save from './save';
import transforms from './transforms';

const { name } = metadata;

export { metadata, name };

export const settings = {
	title: _x( 'Pullquote', 'block title' ),
	description: __(
		'Give special visual emphasis to a quote from your text.'
	),
	icon,
	example: {
		attributes: {
			value:
				'<p>' +
				// translators: Quote serving as example for the Pullquote block. Attributed to Matt Mullenweg.
				__(
					'One of the hardest things to do in technology is disrupt yourself.'
				) +
				'</p>',
			citation: __( 'Matt Mullenweg' ),
		},
	},
	transforms,
	edit,
	save,
	deprecated,
};
