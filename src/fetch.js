import config from './config';
import { createAction } from 'redux-actions';
// import { StatusBarService } from '../services';
// import DeviceInfo from 'react-native-device-info';

export const status = {
  BEGIN: 'begin',
  ERROR: 'error',
  SUCCESS: 'success',
  TIMEOUT: 'timeout',
};

/**
 * These are helpers that
 *
 *  a. reduces boilerplate everywhere you want to make http requests, and
 *  b. enforces a convention on the shape of http request actions.
 *
 */

export const success = (actionType, params) =>
  createAction(actionType,
      payload => payload,
      _payload => ({
        status: status.SUCCESS,
        params,
        receivedAt: Math.floor((new Date()).getTime() / 1000),
      })
  );

export const error = (actionType, params) =>
  createAction(actionType,
    payload => payload,
    _payload => ({
      status: status.ERROR,
      params,
    })
  );

export const begin = (actionType, params) =>
  createAction(actionType,
    payload => payload,
    _payload => ({
      status: status.BEGIN,
      params,
    })
  );

export const timedout = (actionType, params) =>
  createAction(actionType,
    payload => payload,
    _payload => ({
      status: status.TIMEOUT,
      params,
    })
  );

// const appVersionString = () =>
//   `${DeviceInfo.getBrand()}|${DeviceInfo.getModel()}|${DeviceInfo.getVersion()}|${DeviceInfo.getBuildNumber()}|${DeviceInfo.getTimezone()}`;

export const ajaxRequest = (actionType, pathFn, opts, params, transform = (_ => _)) =>
  // dispatch and getState are given to us by the redux-thunk middleware
  (dispatch, getState) => {
    dispatch(begin(actionType, params)(opts.rawBody)); // <- Sends payload to "begin" also

    const state = getState();
    const url = pathFn(config, state);
    // if (state.auth.token !== null) {
    //   opts.headers = { // eslint-disable-line
    //     ...opts.headers,
    //     'Auth-Token': state.auth.token,
    //   };
    // }
    return new Promise((resolve) => {
      const q = new XMLHttpRequest();
      q.timeout = 60000;
      q.open(opts.method, url, true);
      Object.keys(opts.headers).forEach((k) => q.setRequestHeader(k, opts.headers[k] || ''));
      q.onreadystatechange = () => {
        if (q.readyState === q.DONE) {
          if (q.status >= 200 && q.status < 300) {
            try {
              const data = q.responseText
                ? transform(JSON.parse(q.responseText))
                : null;
              dispatch(success(actionType, Object.assign({}, params, q.responseHeaders))(data, opts.headers));
              resolve(data);
            }
            catch (e) {
              console.log(q);
              dispatch(error(actionType, params)(e));
            }
          }
          else {
            console.log(q);
            dispatch(error(actionType, params)(q.responseText));
          }
        }
      };
      q.ontimeout = () => {
        console.log('Request timed out', actionType, params);
        dispatch(timedout(actionType, params)());
      };
      q.send(opts.body || null);
    });
  };

const commonHeaders = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
};

const commonHeadersRaw = { };

const opts = {
  get: () => ({
    method: 'GET',
    headers: { ...commonHeaders },
  }),
  head: () => ({
    method: 'HEAD',
    headers: { ...commonHeaders },
  }),
  put: (data) => ({
    method: 'PUT',
    body: data && JSON.stringify(data),
    rawBody: data,
    headers: { ...commonHeaders },
  }),
  post: (data) => ({
    method: 'POST',
    body: JSON.stringify(data),
    rawBody: data,
    headers: { ...commonHeaders },
  }),
  delete: (_data) => ({
    method: 'DELETE',
    headers: { ...commonHeaders },
  }),
  postRaw: (data, headers) => ({
    method: 'POST',
    body: data,
    rawBody: data,
    headers: { ...commonHeadersRaw, ...headers },
  }),
};

export const get = (actionType, pathFn, params, transform = (_ => _)) =>
  ajaxRequest(actionType, pathFn, opts.get(), params, transform);

export const head = (actionType, pathFn, params, transform = (_ => _)) =>
  ajaxRequest(actionType, pathFn, opts.head(), params, transform);

export const post = (actionType, pathFn, body, params, transform = (_ => _)) =>
  ajaxRequest(actionType, pathFn, opts.post(body), params, transform);

export const postRaw = (actionType, pathFn, body, params, headers, transform = (_ => _)) =>
  ajaxRequest(actionType, pathFn, opts.postRaw(body, headers), params, transform);

export const put = (actionType, pathFn, body, params, transform = (_ => _)) =>
  ajaxRequest(actionType, pathFn, opts.put(body), params, transform);

export const delete_ = (actionType, pathFn, params, transform = (_ => _)) =>
  ajaxRequest(actionType, pathFn, opts.delete(), params, transform);
