import { useState } from 'react';
import BookList from '../components/BookList';
import CategoryFilter from '../components/CategoryFilter';
import WelcomeHeader from '../components/WelcomeHeader';
import CartSummary from '../components/CartSummary';

function BookstorePage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div className="container">
        <CartSummary />
        <div className="row mb-3">
          <WelcomeHeader />
        </div>
        <div className="row">
          <div className="col-md-3">
            <CategoryFilter
              selectedCategories={selectedCategories}
              setSelectedCategories={(selectedCategories) =>
                setSelectedCategories(selectedCategories)
              }
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookstorePage;
