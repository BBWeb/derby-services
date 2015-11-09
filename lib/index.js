module.exports = function(racer) {
  var Model = racer.Model;
  racer._services = {};

  /**
   * Register service classes to Racer
   *
   * @param {Object} Service - a service class
   * @param {String} args.prototype.name - the name of the service
   */
  racer.service = function (Service) {
    if(!Service.prototype.name) throw new Error('The service must have a name!');

    racer._services[Service.prototype.name] = Service;
  };

  /**
   * Create a new instance of a service
   *
   * @param {String} name - The name of the service to create
   * @param {Array} [args] - Arguments to apply to the constructor
   */
  Model.prototype.service = function (name) {
    var Service = racer._services[name];

    if(!Service) throw new Error('No service exists with name: ' + name);

    // Set arguments to be passed to constructor
    var args = Array.prototype.slice.call(arguments);
    args[0] = null;

    return new (Function.prototype.bind.apply(Service, args));
  };
};
