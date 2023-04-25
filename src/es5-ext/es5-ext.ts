export {};

/**
 * This is a workaround to solve a compile issue
 * 
 * Error /node_modules/typescript/lib/lib.es2015.iterable.d.ts (226,59): Cannot find name 'Awaited'.
 * Error /node_modules/typescript/lib/lib.es2015.iterable.d.ts (234,60): Cannot find name 'Awaited'.
 * 
 * The decentraland-ecs package includes a full copy of the es5.d.ts file from TypeScript (perhaps with some modifications?). 
 * The cause of this problem is because a more recent version of TypeScript has added Awaited on their base es5.d.ts file.
 * 
 * Decentraland's runtime for ECS 6.x.x includes definitions of a very specific subset of JS that is considered safe to be used.
 * 
 * If those extra imports/refs are causing problems, my recommendation is to encapsulate the behavior in a DCL library, but I'm not sure how much this is worth the effort, I'd defer to you for that.
 * On the other hand, ES5 is ensured to be supported forever, adding those es2015 imports is hackish and not officially supported, even though it most likely work in runtime
 */
declare global {

    /**
     * Recursively unwraps the "awaited type" of a type. Non-promise "thenables" should resolve to `never`. This emulates the behavior of `await`.
     */
    type Awaited<T> =
        T extends null | undefined ? T : // special case for `null | undefined` when not in `--strictNullChecks` mode
            T extends object & { then(onfulfilled: infer F): any } ? // `await` only unwraps object types with a callable `then`. Non-object types are not unwrapped
                F extends ((value: infer V, ...args: any) => any) ? // if the argument to `then` is callable, extracts the first argument
                    Awaited<V> : // recursively unwrap the value
                    never : // the argument to `then` was not callable
            T; // non-object or non-thenable

}