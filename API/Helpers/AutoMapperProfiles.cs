using System.Linq;
using AutoMapper;
using Brum.API.Dtos;
using Brum.API.Dtos.Message;
using Brum.API.Dtos.Ride;
using Brum.API.Helpers.Enums;
using Brum.API.Models;

namespace Brum.API.Helpers
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p=>p.IsMain).Url))
                .ForMember(dest => dest.Age, 
                    opt => opt.MapFrom(src => src.DateOfBirth.CalculateAgе()));
            CreateMap<User, UserForDetailDto>()
                .ForMember(dest => dest.PhotoUrl, opt => 
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p=>p.IsMain).Url))
                 .ForMember(dest => dest.Age, opt => opt.MapFrom(src => src.DateOfBirth.CalculateAgе()));
            CreateMap<Photo, PhotosForDetailDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();
            CreateMap<MessageForCreationDto, Message>().ReverseMap();
            CreateMap<Message, MessageToReturnDto>()
                .ForMember(m => m.SenderPhotoUrl, 
                    opt => opt.MapFrom(u => u.Sender.Photos.FirstOrDefault(p => p.IsMain).Url))
                .ForMember(m => m.RecipientPhotoUrl, 
                    opt => opt.MapFrom(u => u.Recipient.Photos.FirstOrDefault(p => p.IsMain).Url));
            CreateMap<RideForCreationDto, Ride>();
            CreateMap<Ride, RideToReturnDto>()
                .ForMember(m => m.RequestedPassengers, opt =>
                    opt.MapFrom(src => src.Passengers.Where(w => w.RideId == src.Id && w.Status == PassengerStatus.Requested).Select(w => w.Passenger).ToList())
                )
                .ForMember(m => m.ApprovedPassengers, opt => 
                    opt.MapFrom(src => src.Passengers.Where(w => w.RideId == src.Id && w.Status == PassengerStatus.Approved).Select(w => w.Passenger).ToList())
                )
                .ForMember(m => m.RejectedPassengers, opt => 
                    opt.MapFrom(src => src.Passengers.Where(w => w.RideId == src.Id && w.Status == PassengerStatus.Rejected).Select(w => w.Passenger).ToList())
                );
        }
    }
}