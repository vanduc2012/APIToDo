using API_TODO.Models;
using LightQuery;
using LightQuery.Client;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_TODO.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly API_TODODBContext _context;
        public StudentsController(API_TODODBContext context)
        {
            _context = context;
        }

        // GET: api/Students
        
        [HttpGet]
        
        public async Task<ActionResult<IEnumerable<StudentsModel>>> GetStudentsModel(
            bool isDelete, int all, string name, string address, string codeView, string birthDay)
        {


            #region ShowOrSearch

            if (all == 1) // show for active
            {
                if (!String.IsNullOrEmpty(name) || !String.IsNullOrEmpty(address)
                    || !String.IsNullOrEmpty(codeView))
                {
                   
                    return await _context.StudentsModel.Include("Classes").Where(
                        x => x.Name.Contains(name)||
                        x.Address.Contains(address) ||
                        x.CodeView.Contains(codeView))
                    .Where(x=>x.IsDelete == isDelete).Where(x=>x.Classes.IsDelete == false).OrderBy(x => x.Name)
                       .ToListAsync();
                }
                return await _context.StudentsModel.Include("Classes").Where(x => x.IsDelete == isDelete).Where(x => x.Classes.IsDelete == false).OrderBy(x => x.Name)
                       .ToListAsync();
            }
            else
            {
                if (all == 2) // show for all
                {
                    if (!String.IsNullOrEmpty(name)|| !String.IsNullOrEmpty(address)
                        || !String.IsNullOrEmpty(codeView))
                    {
                        return await _context.StudentsModel.Where(x => x.Name.Contains(name)||
                        x.Address.Contains(address) ||
                        x.CodeView.Contains(codeView)).Include("Classes").Where(x => x.Classes.IsDelete == false).OrderBy(x => x.Name).ToListAsync();
                    }
                    return await _context.StudentsModel.Include("Classes").Where(x => x.Classes.IsDelete == false).OrderBy(x => x.Name).ToListAsync();
                }
               
            }
            return await _context.StudentsModel.Include("Classes").Where(x => x.Classes.IsDelete == false).OrderBy(x => x.Name).ToListAsync();

            //if (all == 1) // search for active or remove
            //{
            //    // search with all params
            //    //if (!String.IsNullOrEmpty(name) && !String.IsNullOrEmpty(address) && !String.IsNullOrEmpty(birthDay))
            //    //{
            //    //    //return with all params
            //    //    return await _context.StudentsModel.Where(x => x.Name.Contains(name)
            //    //                && x.IsDelete == isDelete
            //    //                && x.Address.Contains(address)
            //    //                && x.BirthDay == DateTime.Parse(birthDay))
            //    //               .OrderByDescending(x => x.Name)
            //    //                .ToListAsync();
            //    //}
            //    //else
            //    //{
            //    //    //search with params: address and name
            //    //    if (!String.IsNullOrEmpty(name))
            //    //    {
            //    //        if (!String.IsNullOrEmpty(address))
            //    //        {
            //    //            return await _context.StudentsModel.Where(x => x.Name.Contains(name) && x.Address.Contains(address) && x.IsDelete == isDelete).ToListAsync();
            //    //        }
            //    //        else    // address = null
            //    //        {
            //    //            if (!String.IsNullOrEmpty(birthDay))
            //    //            {
            //    //                return await _context.StudentsModel.Where(x => x.BirthDay == DateTime.Parse(birthDay) && x.Name.Contains(name) && x.IsDelete == isDelete).ToListAsync();
            //    //            }
            //    //        }
            //    //        return await _context.StudentsModel.Where(x => x.Name.Contains(name) && x.IsDelete == isDelete).ToListAsync();
            //    //    }
            //    //    else // name = null
            //    //    {
            //    //        //search with params: address and birthday
            //    //        if (!String.IsNullOrEmpty(address))
            //    //        {
            //    //            if (!String.IsNullOrEmpty(birthDay))
            //    //            {
            //    //                //return list with params: address and birthday
            //    //                return await _context.StudentsModel.Where(x => x.BirthDay == DateTime.Parse(birthDay) && x.Address.Contains(address) && x.IsDelete == isDelete).ToListAsync();
            //    //            }
            //    //            //return list with params: address
            //    //            return await _context.StudentsModel.Where(x => x.Address.Contains(address) && x.IsDelete == isDelete).ToListAsync();
            //    //        }

            //    //        else  //address = null
            //    //        {
            //    //            if (!String.IsNullOrEmpty(birthDay))
            //    //            {
            //    //                //return list student with params birthday
            //    //                return await _context.StudentsModel.Where(x => x.BirthDay == DateTime.Parse(birthDay) && x.IsDelete == isDelete).ToListAsync();
            //    //            }
            //    //        }
            //    //    }
            //    //}
            //    return await _context.StudentsModel.Where(x => x.IsDelete == isDelete).OrderBy(x => x.Name)
            //    .ToListAsync();
            //}
            ////else
            ////if (all == 2) // search for all
            ////{
            ////    //// search with all params
            ////    //if (!String.IsNullOrEmpty(name) && !String.IsNullOrEmpty(address) && !String.IsNullOrEmpty(birthDay))
            ////    //{
            ////    //    //return with all params
            ////    //    return await _context.StudentsModel.Where(x => x.Name.Contains(name)
            ////    //                && x.Address.Contains(address)
            ////    //                && x.BirthDay == DateTime.Parse(birthDay))
            ////    //               .OrderByDescending(x => x.Name)
            ////    //                .ToListAsync();
            ////    //}
            ////    //else
            ////    //{
            ////    //    //search with params: address and name
            ////    //    if (!String.IsNullOrEmpty(name))
            ////    //    {
            ////    //        if (!String.IsNullOrEmpty(address))
            ////    //        {
            ////    //            return await _context.StudentsModel.Where(x => x.Name.Contains(name) && x.Address.Contains(address)).ToListAsync();
            ////    //        }
            ////    //        // address = null
            ////    //        else
            ////    //        {
            ////    //            if (!String.IsNullOrEmpty(birthDay))
            ////    //            {
            ////    //                return await _context.StudentsModel.Where(x => x.BirthDay == DateTime.Parse(birthDay) && x.Name.Contains(name)).ToListAsync();
            ////    //            }
            ////    //        }
            ////    //        return await _context.StudentsModel.Where(x => x.Name.Contains(name)).ToListAsync();
            ////    //    }
            ////    //    // name = null
            ////    //    else
            ////    //    {
            ////    //        //search with params: address and birthday
            ////    //        if (!String.IsNullOrEmpty(address))
            ////    //        {
            ////    //            if (!String.IsNullOrEmpty(birthDay))
            ////    //            {
            ////    //                //return list with params: address and birthday
            ////    //                return await _context.StudentsModel.Where(x => x.BirthDay == DateTime.Parse(birthDay) && x.Address.Contains(address)).ToListAsync();
            ////    //            }
            ////    //            //return list with params: address
            ////    //            return await _context.StudentsModel.Where(x => x.Address.Contains(address)).ToListAsync();
            ////    //        }
            ////    //        //address = null
            ////    //        else
            ////    //        {
            ////    //            if (!String.IsNullOrEmpty(birthDay))
            ////    //            {
            ////    //                return await _context.StudentsModel.Where(x => x.BirthDay == DateTime.Parse(birthDay)).ToListAsync();
            ////    //            }
            ////    //        }
            ////    //    }
            ////        return await _context.StudentsModel.OrderBy(x => x.Name)
            ////        .ToListAsync();
            ////    }
            //return await _context.StudentsModel.ToListAsync();
            #endregion
        }
        
        // GET: api/Students/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StudentsModel>> GetStudentsModel(int id)
        {
            var studentsModel = await _context.StudentsModel.FindAsync(id);

            if (studentsModel == null)
            {
                return NotFound();
            }

            return studentsModel;
        }

        // PUT: api/Students/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutStudentsModel(int id, StudentsModel studentsModel)
        {
            if (id != studentsModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentsModelExists(id))
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


        [HttpPatch("{id}")]
        public async Task<IActionResult> PatchStudentsModel(int id, StudentsModel studentsModel)
        {
            if (id != studentsModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(studentsModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentsModelExists(id))
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


        // POST: api/Students
        [HttpPost]
        public async Task<ActionResult<StudentsModel>> PostStudentsModel(StudentsModel studentsModel)
        {
            if (StudentCodeViewExist(studentsModel.CodeView)) {
                return NotFound();
            }
            else
            {
                _context.StudentsModel.Add(studentsModel);
                await _context.SaveChangesAsync();
                return CreatedAtAction("GetStudentsModel", new { id = studentsModel.Id }, studentsModel);
            }
            

            
        }

        // DELETE: api/Students/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<StudentsModel>> DeleteStudentsModel(int id)
        {
            var studentsModel = await _context.StudentsModel.FindAsync(id);
            if (studentsModel == null)
            {
                return NotFound();
            }

            _context.StudentsModel.Remove(studentsModel);
            await _context.SaveChangesAsync();

            return studentsModel;
        }

        private bool StudentsModelExists(int id)
        {
            return _context.StudentsModel.Any(e => e.Id == id);
        }
        private bool StudentCodeViewExist(string codeView)
        {
            return _context.StudentsModel.Any(x => x.CodeView.Contains(codeView));
        }
    }
}
