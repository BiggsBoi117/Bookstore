﻿using Bookstore.API.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private BookstoreDbContext _context; // Context
        public BookstoreController(BookstoreDbContext context) => _context = context; // Constructor

        [HttpGet("AllBooks")]
        public IEnumerable<Book> GetBooks(int pageSize)
        {
            var books = _context.Books
                .Take(pageSize)
                .ToList();
            return books;
        }


                
    }
}
