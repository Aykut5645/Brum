using System;
using System.Collections.Generic;

namespace Brum.API.Dtos.Ride
{
    public class RideToReturnDto
    {
        
        public int Id { get; set; }
        public UserForListDto Driver { get; set; }
        public int TotalSeats { get; set; }
        public DateTime Date { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public ICollection<UserForListDto> RequestedPassengers { get; set; }
        public ICollection<UserForListDto> ApprovedPassengers { get; set; }
        public ICollection<UserForListDto> RejectedPassengers { get; set; }
        
    }
}