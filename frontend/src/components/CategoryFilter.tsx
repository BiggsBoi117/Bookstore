import './CategoryFilter.css';
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://bookstore-backend-esb49-c8gph8a5bkesg3ah.eastus-01.azurewebsites.net/api/Bookstore'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCategoryChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((category) => category !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="CategoryFilter">
      <div className="d-flex align-items-center">
        <h5 className="me-2">
          Book Categories{' '}
          <button
            className="btn btn-link"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#category-collapse"
            aria-expanded={isCollapsed}
            aria-controls="category-collapse"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <span
              className={`bi ${isCollapsed ? 'bi-chevron-down' : 'bi-chevron-up'} text-primary fs-3`}
            ></span>
          </button>
        </h5>
      </div>
      <div
        id="category-collapse"
        className={`collapse ${isCollapsed ? '' : 'show'}`}
      >
        <div className="CategoryList">
          {categories.map((category) => (
            <div key={category} className="CategoryItem">
              <input
                type="checkbox"
                id={category}
                name={category}
                value={category}
                className="CategoryCheckbox form-check-input"
                onChange={handleCategoryChange}
              />
              <label htmlFor={category}>{category}</label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CategoryFilter;
