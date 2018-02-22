export default function ({ types, excludes = [] }) {
    const mutations = {};

    Object.keys(types).forEach((key) => {
        if (!excludes.includes(key)) {
            /*
             * To camel case.
             */
            const name = key.toLowerCase().replace(/(_)([a-z0-9])/g, match => match[1].toUpperCase());

            // eslint-disable-next-line func-names
            mutations[key] = function (state, payload) {
                state[name] = payload;
            };
        }
    });

    return mutations;
}
