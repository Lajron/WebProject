using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace backend.Models 
{   
    [Table("User")]
    public class User {
        [Key]
        [Column("ID")]
        public int ID { get; set; }

        [Column("Plate")]
        public string Plate { get; set; }

        [Column("Date")]
        public DateTime Date { get; set; }

        [Column("Money")]
        public int Money { get; set; }

        [JsonIgnore]
        public Street Street { get; set; }

    }
}