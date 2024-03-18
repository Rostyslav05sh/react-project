import {useSearchParams} from "react-router-dom";
import {useEffect} from "react";

const usePageQuery = () => {

    const [query, setQuery] = useSearchParams({page: '1'});
    const page = query.get('page')

    useEffect(() => {
        const page = query.get('page');
        if (page === null || page === undefined) {
            setQuery({ page: '1' });
        }
    }, [query, setQuery]);

    return {
        page,
        prev: () => setQuery(prev => {
            prev.set('page', (+prev.get('page') - 1).toString())
            return prev
        }),
        next: () => setQuery(prev => {
            prev.set('page', (+prev.get('page') + 1).toString())
            return prev
        })
    };
};

export {usePageQuery};