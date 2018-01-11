const parseArguments = (initialArguments) => {
    const first = initialArguments[0];
    const second = initialArguments[1];

    let result = {
        namespace: null,
        prefix: false,
        mappings: first,
    };

    if (!Array.isArray(first)) {
        result = {
            namespace: first.namespace !== undefined ? first.namespace : null,
            prefix: first.prefix !== undefined ? first.prefix : false,
            mappings: second,
        };
    }

    return result;
};

const createGetter = (namespace, mapping) => {
    let getter = mapping;

    if (namespace) {
        getter = `${namespace}/${getter}`;
    }

    // eslint-disable-next-line func-names
    return function () {
        return this.$store.getters[getter];
    };
};

const createSetter = (namespace, mapping) => {
    /*
     * To upper snake case.
     */
    let mutation = mapping.replace(/([A-Z])/, '_$1').toUpperCase();

    if (namespace) {
        mutation = `${namespace}/${mutation}`;
    }

    // eslint-disable-next-line func-names
    return function (value) {
        this.$store.commit(mutation, value);
    };
};

/**
 * Generates two way computed properties.
 *
 * @param {string|Array} required
 * @param {boolean|Array} optional
 * @param {Array} optional
 *
 * @return {Object}
 */
export default function () {
    /*
     * This function supports two argument signatures. if the
     * first argument is a object, we will use that as the
     * namespace and prefix for computed properties, and the
     * next argument as the state mapping.
     */
    const {
        namespace,
        prefix,
        mappings,
    } = parseArguments(arguments); // eslint-disable-line prefer-rest-params

    const computedProperties = {};

    /*
     * Turn key into getters and setters.
     */
    mappings.forEach((key) => {
        let name = key;

        if (prefix) {
            /*
             * To camel case.
             */
            name = name.charAt(0).toUpperCase() + name.slice(1);
            name = `${namespace.replace(/(\/)(\w{1})/, match => match[1].toUpperCase())}${name}`;
        }

        computedProperties[name] = {
            get: createGetter(namespace, key),
            set: createSetter(namespace, key),
        };
    });

    return computedProperties;
}
