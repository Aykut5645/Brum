using System;
using System.Collections.Generic;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Brum.API.Data;
using Brum.API.Data.Repositories;
using Brum.API.Dtos.Ride;
using Brum.API.Helpers;
using Brum.API.Helpers.Enums;
using Brum.API.Helpers.Params;
using Brum.API.Models;
using Microsoft.AspNetCore.Mvc;


namespace Brum.API.Controllers
{
    [ServiceFilter(typeof(LogUserActivity))]
    [Route("api/users/{userId}/[controller]")]
    [ApiController]
    public class RidesController: ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IUsersRepository _repo;

        public RidesController(IMapper mapper, IUsersRepository repo)
          {
            _mapper = mapper;
            _repo = repo;
        }

        [HttpPost]
        public async Task<IActionResult> CreateRide(int userId, RideForCreationDto rideForCreationDto)
        {
            var user = await _repo.GetUser(userId, false);

            if (user.Id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            rideForCreationDto.DriverId = userId;

            var ride = _mapper.Map<Ride>(rideForCreationDto);

            _repo.Add(ride);

            if( await _repo.SaveAll())
            { 
                var rideToReturn = _mapper.Map<RideToReturnDto>(ride);
                return CreatedAtRoute("GetRide", new {userId, id = ride.Id}, rideToReturn);
            }

            throw new Exception("Creating the ride failed on save.");
        }
        
        [HttpGet("{id}", Name = "GetRide")]
        public async Task<IActionResult> GetRide(int id)
        {
            var ride = await _repo.GetRide(id);

            if(ride == null) return NotFound();
            var rideToReturn = _mapper.Map<RideToReturnDto>(ride);
            return Ok(rideToReturn);
        }

        [HttpPost("{id}/addPassenger/{passengerId}")]
        public async Task<IActionResult> AddPassengerToRide(int id, int userId, int passengerId) 
        {
            if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var userRide = await _repo.GetUserRide(id, passengerId);

            if(userRide != null)
            {
                return BadRequest("You have already beeen added to this ride.");
            }
            var ride = await _repo.GetRide(id);
            if(ride == null)
            {
                return NotFound();
            }

            userRide = new UserRide
            {
                RideId = id, 
                PassengerId = passengerId
            };

            _repo.Add<UserRide>(userRide);

            if( await _repo.SaveAll()) return Ok();

            return BadRequest("Failed to add user to ride.");

        }

        [HttpPost("{id}/removePassenger/{passengerId}")]
        public async Task<IActionResult> DeleteRide(int id, int userId, int passengerId)
        {
            if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var userRide = await _repo.GetUserRide(id, passengerId);

            _repo.Delete(userRide);
            
            if(await _repo.SaveAll()) return NoContent();

            throw new Exception("Error removing the passenger");
        }

        [HttpPost("{id}/delete")]
        public async Task<IActionResult> DeleteRide(int id, int userId)
        {
            if (userId!= int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)) return Unauthorized();

            var ride = await _repo.GetRide(id);
            var userRides = await _repo.GetRideWithPassengers(id);

            foreach(var userRide in userRides)
            {
                _repo.Delete(userRide);
            }
            _repo.Delete(ride);
            
            if(await _repo.SaveAll()) return NoContent();

            throw new Exception("Error deleting the ride");
        }

        [HttpGet]
        public async Task<IActionResult> GetRides([FromQuery]RideParams rideParams, int userId)
        {
            
            var rides = await _repo.GetRides(rideParams, userId);
         


            var ridesToReturn = _mapper.Map<IEnumerable<RideToReturnDto>>(rides);

            Response.AddPagination(rides.CurrentPage, rides.PageSize, rides.TotalCount, rides.TotalPages);

            return Ok(ridesToReturn);
        }

        [HttpPost("{id}/approve/{passengerId}")]
        public async Task<IActionResult> ApprovePassenger(int id, int passengerId)
        {
            var userRide = await _repo.GetUserRide(id, passengerId);

            if(userRide == null) return NotFound("No such passenger");

            userRide.Status = PassengerStatus.Approved;

            await _repo.SaveAll();

            return Ok();
        }

        [HttpPost("{id}/reject/{passengerId}")]
        public async Task<IActionResult> RejectPassenger(int id, int passengerId)
        {
            var userRide = await _repo.GetUserRide(id, passengerId);

            userRide.Status = PassengerStatus.Rejected;

            await _repo.SaveAll();

            return Ok();
        }

    }
}