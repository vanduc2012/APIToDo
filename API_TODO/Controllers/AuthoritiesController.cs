using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using API_TODO.Models;

namespace API_TODO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthoritiesController : ControllerBase
    {
        private readonly API_TODODBContext _context;

        public AuthoritiesController(API_TODODBContext context)
        {
            _context = context;
        }

        // GET: api/Authorities
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Authority>>> GetAuthority()
        {
            return await _context.Authority.ToListAsync();
        }

        // GET: api/Authorities/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Authority>> GetAuthority(int id)
        {
            var authority = await _context.Authority.FindAsync(id);

            if (authority == null)
            {
                return NotFound();
            }

            return authority;
        }

        // PUT: api/Authorities/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAuthority(int id, Authority authority)
        {
            if (id != authority.id)
            {
                return BadRequest();
            }

            _context.Entry(authority).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AuthorityExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Authorities
        [HttpPost]
        public async Task<ActionResult<Authority>> PostAuthority(Authority authority)
        {
            _context.Authority.Add(authority);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAuthority", new { id = authority.id }, authority);
        }

        // DELETE: api/Authorities/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Authority>> DeleteAuthority(int id)
        {
            var authority = await _context.Authority.FindAsync(id);
            if (authority == null)
            {
                return NotFound();
            }

            _context.Authority.Remove(authority);
            await _context.SaveChangesAsync();

            return authority;
        }

        private bool AuthorityExists(int id)
        {
            return _context.Authority.Any(e => e.id == id);
        }
    }
}
