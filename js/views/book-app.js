import { bookService } from '../services/book-service.js';
import bookList from '../cmps/book-list.cmp.js';
import bookDetails from './book-details.js';
import bookFilter from '../cmps/book-filter.js'



export default {
    template: `
        
        <section class="book-app app-main">
            <book-filter @filtered="setFilter"></book-filter>
            <book-list v-if="!selectedBook" :books="booksToShow" @selected="selectBook"></book-list> 
            <!-- <book-details :book="selectedBook"> -->
            <book-details v-else :book="selectedBook" @close="selectedBook = null"/>
            <!-- </book-details> -->
        </section>
    `,
    components: {
        bookList,
        bookDetails,
        bookFilter,
    },
    data() {
        return {
            books: [],
            filterBy: null,
            selectedBook: null,

        };
    },
    methods: {
        setFilter(filterBy) {
            this.filterBy = filterBy;
        },
        selectBook(book) {
            this.selectedBook = book;
        }

    },
    created() {
        bookService.query()
        .then(books => this.books = books)
    },
    computed: {
        booksToShow() {
            if (!this.filterBy) return this.books;
            const regex = new RegExp(this.filterBy.title, 'i');
            return this.books.filter(book => (regex.test(book.title) && (this.filterBy.price > book.listPrice.amount)));
        },

    },


}