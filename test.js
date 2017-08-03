var crcHelper = require('./crc')

var buf = new Buffer('419700250076f9bcffa0ff1e0420004fff160141473b3e37433f460000474910dbbdc649a443ae1b86007dff62ff201effffffff49460000f800649d9c9c46454a012c016c038d00000063004544119643ae1bdebdc64909008c0007003a030344430040371185116802e2011700434200ff260efd00af43ae1bd7bdc6490d00424115118d0491037000dcffb0031d005aff1c01414b018e0000000000000000000000000000000000004b473c403f444141000047460000f800649d9c9c46454b012c01f3ff8f0000006300454411a343ae1bdabdc64909008b0000003a03034443004037118512c902e201170043420500260dfe00c843ae1bcfbdc6490d00424133103afe240a98ff83ffb303130075ff2701414b018f0000000000000000000000000000000000004b473e3939404545000047460000f800649d9c9c464544012c0136058f0000006300454411c443ae1bd4bdc64909007400fcff3903034443003f31118512cd02e2011700434208ff260afe00de43ae1bc9bdc6490d00424188fcc9fbdaf1a0007dff7c0314008fff2f01414b018f0000000000000000000000000000000000004b4735402a473b52000047460000f800649d9c9c464543012c01e6098f0000006300454411d843ae1bd3bdc64909006100feff3803034443003e31118512a706e2011800434206fb26080000ec43ae1bc7bdc6490d0042416602a4f5dfecceffd7ff780424008fff2c01414b018e0000000000000000000000000000000000004b47384737413241000047460000f800649d9c9c464545012c018f078f0000006300454411d843ae1bd3bdc64909006100feff3703034443003d331185123f05e3011800434202f626070300f743ae1bcebdc6490d00424159ea36f1b206c2fea1ff780442007eff2301414b018d0000000000000000000000000000000000004b419700250076f9bcffa0ff1e0420004fff160141473b3e37433f460000474910dbbdc649a443ae1b86007dff62ff201effffffff49460000f800649d9c9c46454a012c016c038d00000063004544119643ae1bdebdc64909008c0007003a030344430040371185116802e2011700434200ff260efd00af43ae1bd7bdc6490d00424115118d0491037000dcffb0031d005aff1c01414b018e0000000000000000000000000000000000004b473c403f444141000047460000f800649d9c9c46454b012c01f3ff8f0000006300454411a343ae1bdabdc64909008b0000003a03034443004037118512c902e201170043420500260dfe00c843ae1bcfbdc6490d00424133103afe240a98ff83ffb303130075ff2701414b018f0000000000000000000000000000000000004b473e3939404545000047460000f800649d9c9c464544012c0136058f0000006300454411c443ae1bd4bdc64909007400fcff3903034443003f31118512cd02e2011700434208ff260afe00de43ae1bc9bdc6490d00424188fcc9fbdaf1a0007dff7c0314008fff2f01414b018f0000000000000000000000000000000000004b4735402a473b52000047460000f800649d9c9c464543012c01e6098f0000006300454411d843ae1bd3bdc64909006100feff3803034443003e31118512a706e2011800434206fb26080000ec43ae1bc7bdc6490d0042416602a4f5dfecceffd7ff780424008fff2c01414b018e0000000000000000000000000000000000004b47384737413241000047460000f800649d9c9c464545012c018f078f0000006300454411d843ae1bd3bdc64909006100feff3703034443003d331185123f05e3011800434202f626070300f743ae1bcebdc6490d00424159ea36f1b206c2fea1ff780442007eff2301414b018d0000000000000000000000000000000000004b','hex')
// console.log(buf)
var crc = crcHelper.generate(buf)

// console.log(crc)

let headBuf = Buffer.from([0xeb,0x90])
let lengthBuf = new Buffer(2)
lengthBuf.writeUInt16LE(buf.length)
// console.log(lengthBuf)

var buf1 = Buffer.concat([headBuf,lengthBuf,crc,buf])
var buf2 = new Buffer('eb905605e284419700250076f9bcffa0ff1e0420004fff160141473b3e37433f460000474910dbbdc649a443ae1b86007dff62ff201effffffff49460000f800649d9c9c46454a012c016c038d00000063004544119643ae1bdebdc64909008c0007003a030344430040371185116802e2011700434200ff260efd00af43ae1bd7bdc6490d00424115118d0491037000dcffb0031d005aff1c01414b018e0000000000000000000000000000000000004b473c403f444141000047460000f800649d9c9c46454b012c01f3ff8f0000006300454411a343ae1bdabdc64909008b0000003a03034443004037118512c902e201170043420500260dfe00c843ae1bcfbdc6490d00424133103afe240a98ff83ffb303130075ff2701414b018f0000000000000000000000000000000000004b473e3939404545000047460000f800649d9c9c464544012c0136058f0000006300454411c443ae1bd4bdc64909007400fcff3903034443003f31118512cd02e2011700434208ff260afe00de43ae1bc9bdc6490d00424188fcc9fbdaf1a0007dff7c0314008fff2f01414b018f0000000000000000000000000000000000004b4735402a473b52000047460000f800649d9c9c464543012c01e6098f0000006300454411d843ae1bd3bdc64909006100feff3803034443003e31118512a706e2011800434206fb26080000ec43ae1bc7bdc6490d0042416602a4f5dfecceffd7ff780424008fff2c01414b018e0000000000000000000000000000000000004b47384737413241000047460000f800649d9c9c464545012c018f078f0000006300454411d843ae1bd3bdc64909006100feff3703034443003d331185123f05e3011800434202f626070300f743ae1bcebdc6490d00424159ea36f1b206c2fea1ff780442007eff2301414b018d0000000000000000000000000000000000004b419700250076f9bcffa0ff1e0420004fff160141473b3e37433f460000474910dbbdc649a443ae1b86007dff62ff201effffffff49460000f800649d9c9c46454a012c016c038d00000063004544119643ae1bdebdc64909008c0007003a030344430040371185116802e2011700434200ff260efd00af43ae1bd7bdc6490d00424115118d0491037000dcffb0031d005aff1c01414b018e0000000000000000000000000000000000004b473c403f444141000047460000f800649d9c9c46454b012c01f3ff8f0000006300454411a343ae1bdabdc64909008b0000003a03034443004037118512c902e201170043420500260dfe00c843ae1bcfbdc6490d00424133103afe240a98ff83ffb303130075ff2701414b018f0000000000000000000000000000000000004b473e3939404545000047460000f800649d9c9c464544012c0136058f0000006300454411c443ae1bd4bdc64909007400fcff3903034443003f31118512cd02e2011700434208ff260afe00de43ae1bc9bdc6490d00424188fcc9fbdaf1a0007dff7c0314008fff2f01414b018f0000000000000000000000000000000000004b4735402a473b52000047460000f800649d9c9c464543012c01e6098f0000006300454411d843ae1bd3bdc64909006100feff3803034443003e31118512a706e2011800434206fb26080000ec43ae1bc7bdc6490d0042416602a4f5dfecceffd7ff780424008fff2c01414b018e0000000000000000000000000000000000004b47384737413241000047460000f800649d9c9c464545012c018f078f0000006300454411d843ae1bd3bdc64909006100feff3703034443003d331185123f05e3011800434202f626070300f743ae1bcebdc6490d00424159ea36f1b206c2fea1ff780442007eff2301414b018d0000000000000000000000000000000000004b','hex')

var buf3 = new Buffer('eb905605e284419700250076f9bcffa0ff1e0420004fff160141473b3e37433f460000474910dbbdc649a443ae1b86007dff62ff201effffffff49460000f800649d9c9c46454a012c016c038d00000063004544119643ae1bdebdc64909008c0007003a030344430040371185116802e2011700434200ff260efd00af43ae1bd7bdc6490d00424115118d0491037000dcffb0031d005aff1c01414b018e0000000000000000000000000000000000004b473c403f444141000047460000f800649d9c9c46454b012c01f3ff8f0000006300454411a343ae1bdabdc64909008b0000003a03034443004037118512c902e201170043420500260dfe00c843ae1bcfbdc6490d00424133103afe240a98ff83ffb303130075ff2701414b018f0000000000000000000000000000000000004b473e3939404545000047460000f800649d9c9c464544012c0136058f0000006300454411c443ae1bd4bdc64909007400fcff3903034443003f31118512cd02e2011700434208ff260afe00de43ae1bc9bdc6490d00424188fcc9fbdaf1a0007dff7c0314008fff2f01414b018f0000000000000000000000000000000000004b4735402a473b52000047460000f800649d9c9c464543012c01e6098f0000006300454411d843ae1bd3bdc64909006100feff3803034443003e31118512a706e2011800434206fb26080000ec43ae1bc7bdc6490d0042416602a4f5dfecceffd7ff780424008fff2c01414b018e0000000000000000000000000000000000004b47384737413241000047460000f800649d9c9c464545012c018f078f0000006300454411d843ae1bd3bdc64909006100feff3703034443003d331185123f05e3011800434202f626070300f743ae1bcebdc6490d00424159ea36f1b206c2fea1ff780442007eff2301414b018d0000000000000000000000000000000000004b419700250076f9bcffa0ff1e0420004fff160141473b3e37433f460000474910dbbdc649a443ae1b86007dff62ff201effffffff49460000f800649d9c9c46454a012c016c038d00000063004544119643ae1bdebdc64909008c0007003a030344430040371185116802e2011700434200ff260efd00af43ae1bd7bdc6490d00424115118d0491037000dcffb0031d005aff1c01414b018e0000000000000000000000000000000000004b473c403f444141000047460000f800649d9c9c46454b012c01f3ff8f0000006300454411a343ae1bdabdc64909008b0000003a03034443004037118512c902e201170043420500260dfe00c843ae1bcfbdc6490d00424133103afe240a98ff83ffb303130075ff2701414b018f0000000000000000000000000000000000004b473e3939404545000047460000f800649d9c9c464544012c0136058f0000006300454411c443ae1bd4bdc64909007400fcff3903034443003f31118512cd02e2011700434208ff260afe00de43ae1bc9bdc6490d00424188fcc9fbdaf1a0007dff7c0314008fff2f01414b018f0000000000000000000000000000000000004b4735402a473b52000047460000f800649d9c9c464543012c01e6098f0000006300454411d843ae1bd3bdc64909006100feff3803034443003e31118512a706e2011800434206fb26080000ec43ae1bc7bdc6490d0042416602a4f5dfecceffd7ff780424008fff2c01414b018e0000000000000000000000000000000000004b47384737413241000047460000f800649d9c9c464545012c018f078f0000006300454411d843ae1bd3bdc64909006100feff3703034443003d331185123f05e3011800434202f626070300f7','hex')
var buf4 = new Buffer('43ae1bcebdc6490d00424159ea36f1b206c2fea1ff780442007eff2301414b018d0000000000000000000000000000000000004b','hex')

var Pin = require('./index')

var pin = new Pin()

pin.onData(function(data){
	console.log('got data:',data)
})

pin.onError(function(e){
	console.log(e)
})

pin.putData(buf1)
pin.putData(buf2)
pin.putData(buf3)
pin.putData(buf4)