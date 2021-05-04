const compose = (...functions) => (component) => {
    return functions.reduceRight((prev, fn) => 
                fn(prev), component)
}

export default compose;