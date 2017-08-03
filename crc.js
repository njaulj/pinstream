var wCRC_Table =
[
    0x0000, 0xCC01, 0xD801, 0x1400, 0xF001, 0x3C00, 0x2800, 0xE401,
    0xA001, 0x6C00, 0x7800, 0xB401, 0x5000, 0x9C01, 0x8801, 0x4400
];

exports.check = function(buffer,length){
  var  crcWord = 0xFFFF;
  var start = 0;
// var length = buffer.length;

function Drv_Crc_Acc(data){
	//	console.log("data,crcWord:",start,data,crcWord)
	var temp;

	temp = wCRC_Table[(data ^ crcWord) & 15] ^ (crcWord >> 4);
	crcWord = wCRC_Table[((data >> 4) ^ temp) & 15] ^ (temp >> 4); 
	}


 while(start<length){
  Drv_Crc_Acc(buffer[start]);
  start++;
  if(start == length){
  	return crcWord
  }
 }
}



exports.generate = function(buffer){
  var  crcWord = 0xFFFF;
  var start = 0;
  var length = buffer.length;
  var buf = new Buffer(2)

    function Drv_Crc_Acc(data){
      //  console.log("data,crcWord:",start,data,crcWord)
      var temp;

      temp = wCRC_Table[(data ^ crcWord) & 15] ^ (crcWord >> 4);
      crcWord = wCRC_Table[((data >> 4) ^ temp) & 15] ^ (temp >> 4); 
    }


   while(start<length){
    Drv_Crc_Acc(buffer[start]);
    start++;
    if(start == length){
      // console.log(crcWord,1)
      buf.writeUInt16LE(crcWord,0)
      return buf
    }
   }
}