import { PAGINATION_QUERY } from '../components/Pagination'; 

export default function paginationField() {
    return {
        keyArgs: false, // tells apollo fuck off, I'll handle this stuff
        read(existing = [], { args, cache }) {
            // asks read function for items
            // we can return items because they are in cache or return false (force a network request)
            const { skip, first } = args;

            const data = cache.readQuery({ query: PAGINATION_QUERY });
            const count = data?._allProductsMeta?.count;
            const page = skip / first + 1;
            const pages = Math.ceil(count / first);

            // check if we have existing items
            const items = existing.slice(skip, skip + first).filter(item => item);

            // if there are items but are less than requested
            if (items.length && items.length !== first && page === pages) {
                return items;
            }

            // if we don't have items
            if (items.length !== first) {
                return false;
            }

            // else
            if (items.length) {
                return items;
            }

            return false;
        },
        merge(existing, incoming, { args }) {
            const { skip, first } = args;
            const merged = existing ? existing.slice(0) : [];

            for(let i = skip; i < skip + incoming.length; i++) {
                merged[i] = incoming[i - skip];
            }

            return merged;
        }
    }
}