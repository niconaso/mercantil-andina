// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mercantilAndina: {
    api: 'https://servicios.qamercantilandina.com.ar/api/v1',
    apiMock: 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1',
  },
  gobAr: {
    geoRefApi: 'https://apis.datos.gob.ar/georef/api',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
