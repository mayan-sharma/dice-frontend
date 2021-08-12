import { resetIdCounter, useCombobox } from 'downshift';
import { useLazyQuery } from '@apollo/client';
import { useRouter } from 'next/dist/client/router';
import debounce from 'lodash.debounce';
import gql from 'graphql-tag';

import { DropDown, DropDownItem, SearchStyles } from './styles/DropDown';

const SEARCH_PRODUCTS_QUERY = gql`
    query SEARCH_PRODUCTS_QUERY($searchTerm: String!) {
        searchTerms: allProducts(where: { 
            OR: [
                { name_contains_i: $searchTerm }
                { description_contains_i: $searchTerm }
            ]
         }) {
            id
            name
            photo {
                image {
                    publicUrlTransformed
                }
            }
        }
    }
`;

export default function Search() {
    
    // to fix the difference between server and client side rendering
    resetIdCounter();

    const router = useRouter();

    // lazy query
    const [findItems, { loading, error, data }] = useLazyQuery(SEARCH_PRODUCTS_QUERY, {
        fetchPolicy: 'no-cache'
    })
    
    const items = data?.searchTerms || [];

    // calling findItems for every keystroke would not be good, hence debouncing
    const findItemsDebounce = debounce(findItems, 350);

    const { isOpen, inputValue, getMenuProps, getInputProps, getComboboxProps, getItemProps, highlightedIndex } = useCombobox({
        items,
        onInputValueChange() {
            console.log('Input changed');
            findItemsDebounce({
                variables: {
                    searchTerm: inputValue
                }
            });
        },
        onSelectedItemChange({ selectedItem }) {
            console.log('Item selected');
            router.push({ pathname: `/product/${selectedItem.id}` })
        },
        itemToString: item => item?.name || ''
    });

    
    return (
        <SearchStyles> 
            <div {...getComboboxProps()}>
                <input {...getInputProps({
                    type: 'search',
                    placeholder: 'Search',
                    id: 'search',
                    className: loading ? 'loading': ''
                })} />
            </div>
            <DropDown {...getMenuProps()}>
                
                {isOpen && items.map((item, idx) => (
                    <DropDownItem key={item.id} {...getItemProps({ item })} highlighted={idx === highlightedIndex}>
                        <img src={item.photo.image.publicUrlTransformed} alt={item.name} width='50' />
                        { item.name }
                    </DropDownItem>
                ))}

                { isOpen && !items.length && !loading && (
                    <DropDownItem>No items found</DropDownItem>
                ) }

            </DropDown>
        </SearchStyles>
    );
}