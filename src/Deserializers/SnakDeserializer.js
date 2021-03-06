( function( wb, util, dv ) {
	'use strict';

var MODULE = wb.serialization,
	PARENT = MODULE.Deserializer;

/**
 * @class wikibase.serialization.SnakDeserializer
 * @extends wikibase.serialization.Deserializer
 * @since 2.0
 * @licence GNU GPL v2+
 * @author H. Snater < mediawiki@snater.com >
 * @author Daniel Werner < daniel.werner@wikimedia.de >
 *
 * @constructor
 */
MODULE.SnakDeserializer = util.inherit( 'WbSnakDeserializer', PARENT, {
	/**
	 * @inheritdoc
	 *
	 * @return {wikibase.datamodel.Snak}
	 *
	 * @throws {Error} if no constructor for the snak type detected exists.
	 */
	deserialize: function( serialization ) {
		if( serialization.snaktype === 'novalue' ) {
			return new wb.datamodel.PropertyNoValueSnak( serialization.property );
		} else if( serialization.snaktype === 'somevalue' ) {
			return new wb.datamodel.PropertySomeValueSnak( serialization.property );
		} else if( serialization.snaktype === 'value' ) {
			var dataValue = null,
				type = serialization.datavalue.type,
				value = serialization.datavalue.value;

			try {
				dataValue = dv.newDataValue( type, value );
			} catch( error ) {
				dataValue = new dv.UnDeserializableValue( value, type, error );
			}

			return new wb.datamodel.PropertyValueSnak( serialization.property, dataValue );
		}

		throw new Error( 'Incompatible snak type' );
	}
} );

}( wikibase, util, dataValues ) );
