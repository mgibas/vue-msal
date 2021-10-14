'use strict';
// @ts-ignore
import { inject } from 'vue'
import { Options, MSALBasic } from './src/types';
import { MSAL } from './src/main';

export default class msalPlugin {
    static install(app: any, options: Options): void {
        app.config.globalProperties.$msal = new msalPlugin(options)
        app.provide('msal', app.config.globalProperties.$msal)
    }
    constructor(options: Options) {
        const msal = new MSAL(options);
        const exposed: MSALBasic = {
            data: msal.data,
            signIn() { msal.signIn(); },
            async signOut() { await msal.signOut(); },
            isAuthenticated() { return msal.isAuthenticated(); },
            async acquireToken(request, retries = 0) { return await msal.acquireToken(request, retries); },
            async msGraph(endpoints, batchUrl) { return await msal.msGraph(endpoints, batchUrl) },
            saveCustomData(key: string, data: any) { msal.saveCustomData(key, data); }
        };
        return exposed;
    }
}

export function useMSAL () {
  return inject('msal')
}
