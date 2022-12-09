using System;
using System.Collections.Generic;
 using Brum.API.Models;

 namespace Brum.API.Dtos
 {
     public class UserForUpdateDto
     {
         public string Introduction { get; set; }
         public string Rules { get; set; }
         public string City { get; set; }
         public string Country { get; set; }
     }
 }