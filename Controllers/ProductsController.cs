﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication;

namespace WebApplication.Models
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ModelContext _context;

        public ProductsController(ModelContext context)
        {
            _context = context;
        }
        // GET: api/Products/
        [HttpGet]
        public async Task<IActionResult> GetProductsPages(
            [FromQuery(Name = "page")]int page,
            [FromQuery(Name = "search")]string searchString,
            [FromQuery(Name = "sort")]string sortField,
            [FromQuery(Name = "category[]")]List<string> searchCategory,
            [FromQuery(Name = "price")]string searchPrice)
        {
            try
            {
                int pageSize = 5;
                IQueryable<Products> source = _context.Product.Include(x => x.Category);
                if (!String.IsNullOrEmpty(searchString))
                {
                    source = source.Where(p => p.ProductName.Contains(searchString));
                }
                if (searchCategory.Count > 0)
                {
                    IQueryable<Products> allProducts = source.Where(p => p.Category.CategoryName.Contains(searchCategory.First()));
                    foreach (var category in searchCategory.Skip(1))
                    {
                        allProducts = allProducts.Concat(source.Where(p => p.Category.CategoryName.Contains(category)));
                    }
                    source = allProducts;
                }
                if (!String.IsNullOrEmpty(searchPrice))
                {
                    var prices = searchPrice.Split("-");
                    if(prices.Length > 0)
                    {
                        source = source.Where(p => p.Price >= (float)Convert.ToDouble(prices[0])
                        && p.Price <= (float)Convert.ToDouble(prices[1]));
                    }
                    else
                    {
                        return BadRequest("You didnt choose right price");
                    }

                }
                if (!String.IsNullOrEmpty(sortField))
                {
                    switch (sortField)
                    {
                        case "expensive":
                            source = source.OrderByDescending(s => s.Price);
                            break;
                        case "cheap":
                            source = source.OrderBy(s => s.Price);
                            break;
                        case "name_az":
                            source = source.OrderBy(s => s.ProductName);
                            break;
                        case "name_za":
                            source = source.OrderByDescending(s => s.ProductName);
                            break;
                        case "category_az":
                            source = source.OrderBy(s => s.Category.CategoryName);
                            break;
                        case "category_za":
                            source = source.OrderByDescending(s => s.Category.CategoryName);
                            break;
                    }
                }
                var count = await source.CountAsync();
                var items = await source.Skip((page - 1) * pageSize).Take(pageSize).ToListAsync();
                PageViewModel pageViewModel = new PageViewModel(count, page, pageSize);
                if (pageViewModel.PageNumber <= pageViewModel.TotalPages && pageViewModel.PageNumber > 0)
                {
                    IndexViewModel viewModel = new IndexViewModel
                    {
                        PageViewModel = pageViewModel,
                        Products = items
                    };
                    return Ok(viewModel);
                }
                else
                {
                    return BadRequest("Page does not exist");
                }
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // PUT: api/Products
        [HttpPut]
        public async Task<IActionResult> PutProducts([FromQuery(Name = "id")]int id, Products products)
        {
            _context.Entry(products).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProductsExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProducts", products);
        }

        // POST: api/Products
        [HttpPost]
        public async Task<ActionResult<Products>> PostProducts([FromBody]Products data)
        {
            try
            {
                _context.Product.Add(data);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetProducts", new { id = data.ID }, data);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        // DELETE: api/Products
        [HttpDelete]
        public async Task<IActionResult> DeleteProducts([FromQuery(Name = "id")]int productId)
        {
            try
            {
                var product = await _context.Product.FindAsync(productId);
                if (product == null)
                {
                    return NotFound();
                }
                _context.Product.Remove(product);
                await _context.SaveChangesAsync();
                return Ok("Successfully deleted");
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        private bool ProductsExists(int id)
        {
            return _context.Product.Any(e => e.ID == id);
        }
    }
}
