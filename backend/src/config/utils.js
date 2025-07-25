function serializeBigInts(obj) {
    return JSON.parse(JSON.stringify(obj, (_, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));
}

module.exports = serializeBigInts;
