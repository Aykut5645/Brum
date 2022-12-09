using System;

namespace Brum.API.Helpers.Params
{
    public class RideParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int pageSize = 10;
        public int PageSize
        {
            get { return pageSize; }
            set { pageSize = (value > MaxPageSize) ? MaxPageSize : value; }
        }
        public string StartPoint { get; set; }
        public string EndPoint { get; set; }
        public DateTime Date { get; set; }
        public bool AsPassenger { get; set; } 
        public bool AsDriver { get; set; }
        public int FreeSeats { get; set; } = -1;
    }
}