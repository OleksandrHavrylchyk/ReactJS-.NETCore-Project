using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication.Models;

namespace WebApplication.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly ModelContext _context;

        public CategoriesController(ModelContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
        public ActionResult<IEnumerable<Categories>> GetCategory()
        {
            IQueryable<Products> source = _context.Product.Include(x => x.Category);
            var maxPrice = source.Max(p => p.Price);
            var minPrice = source.Min(p => p.Price);

            Dictionary<string, float> prices = new Dictionary<string, float>();

            prices.Add("max", maxPrice);
            prices.Add("min", minPrice);

            IQueryable<Categories> categories = _context.Category.OrderBy(c => c.ID);

            CategoriesAndPrice response = new CategoriesAndPrice
            {
                Categories = categories,
                Prices = prices
            };
            return Ok(response);
        }
    }
}
