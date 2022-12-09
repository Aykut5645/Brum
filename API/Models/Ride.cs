using System;
using System.Collections.Generic;

namespace Brum.API.Models
{
    public class Ride
    {
        public int Id { get; set; }
        public int DriverId { get; set; }
        public virtual User Driver { get; set; }
        public virtual ICollection<UserRide> Passengers { get; set; }
        public int TotalSeats { get; set; }
        public DateTime Date { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public DateTime Created { get; set; }
    }
}