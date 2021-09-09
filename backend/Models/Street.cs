using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models 
{
    [Table("Street")]
    public class Street {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Code")]
        public string Code { get; set; }

        [Column("Zone")]
        public int Zone { get; set; }

        [JsonIgnore]
        public City City { get; set; }

        public virtual List<User> Users { get; set; }


    }
}