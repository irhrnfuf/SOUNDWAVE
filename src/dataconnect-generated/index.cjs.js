const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'johan-html-app-service',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

const bookFestivalPassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'BookFestivalPass', inputVars);
}
bookFestivalPassRef.operationName = 'BookFestivalPass';
exports.bookFestivalPassRef = bookFestivalPassRef;

exports.bookFestivalPass = function bookFestivalPass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(bookFestivalPassRef(dcInstance, inputVars));
}
;

const cancelFestivalPassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CancelFestivalPass', inputVars);
}
cancelFestivalPassRef.operationName = 'CancelFestivalPass';
exports.cancelFestivalPassRef = cancelFestivalPassRef;

exports.cancelFestivalPass = function cancelFestivalPass(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(cancelFestivalPassRef(dcInstance, inputVars));
}
;

const listFestivalPassesRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListFestivalPasses');
}
listFestivalPassesRef.operationName = 'ListFestivalPasses';
exports.listFestivalPassesRef = listFestivalPassesRef;

exports.listFestivalPasses = function listFestivalPasses(dcOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrOptions, options, undefined,false, false);
  return executeQuery(listFestivalPassesRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;

const getFestivalPassRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetFestivalPass', inputVars);
}
getFestivalPassRef.operationName = 'GetFestivalPass';
exports.getFestivalPassRef = getFestivalPassRef;

exports.getFestivalPass = function getFestivalPass(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getFestivalPassRef(dcInstance, inputVars), inputOpts && { fetchPolicy: inputOpts.fetchPolicy });
}
;
