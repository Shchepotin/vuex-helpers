export default function ({ states, excludes = [] }) {
    const getters = {};

    Object.keys(states).forEach((key) => {
        if (!excludes.includes(key)) {
            // eslint-disable-next-line func-names
            getters[key] = function (state) {
                return state[key];
            };
        }
    });

    return getters;
}
