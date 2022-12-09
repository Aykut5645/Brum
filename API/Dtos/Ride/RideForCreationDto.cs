using System;

namespace Brum.API.Dtos.Ride
{
    public class RideForCreationDto
    {
        public int DriverId { get; set; }
        public int TotalSeats { get; set; }
        public DateTime Date { get; set; }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public DateTime Created { get; set; }

        public RideForCreationDto()
        {
            Created = DateTime.Now;
        }
    }
}