var EventEmitter = require('events').EventEmitter
var crcHelper = require('./crc')

function Pin (bufferLength) {
	this._event = new EventEmitter()

	this._readPosition = 0
	this._writePosition = 0

	this._dataHeadLength = 6 // 自定义包头长度
	this._dataLength = 0 // 已经接收的长度

	this._bufferLength = 512
	this._buffer = Buffer.alloc(bufferLength || this._bufferLength)
}

Pin.prototype.onData = function (callback) {
	this._event.on('data', callback)
}

Pin.prototype.onError = function (callback) {
	this._event.on('error', callback)
}

Pin.prototype.putData = function (data) {
	if (data === undefined) {
		return;
	}

	let dataLength = data.length
	console.log(dataLength)
	let availableLength = this.getAvailableLength()
	console.log(availableLength)
	if (availableLength < dataLength) {
		console.log(1)
		let exLength = Math.ceil((this._dataLength + dataLength) / 1024) * 1024
		let tempBuffer = Buffer.alloc(exLength)
		this._bufferLength = exLength

		if (this._writePosition < this._readPosition) {
			let tailLength = this._bufferLength - this._readPosition
			this._buffer.copy(tempBuffer, 0 , this._readPosition, tailLength + this._readPosition)			
			this._buffer.copy(tempBuffer, tailLength, 0 , this._writePosition)
			this._dataLength = this._writePosition = tailLength + this._writePosition
		} else {
			this._buffer.copy(tempBuffer, 0, this._readPosition, this._writePosition)
			this._dataLength = this._writePosition = this._writePosition - this._readPosition
		}

		this._buffer = tempBuffer
		tempBuffer = null
		this._readPosition = 0
		data.copy(this._buffer, this._writePosition, 0, dataLength)
		this._dataLength += dataLength
		this._writePosition += dataLength
	} else {
		if (this._writePosition + dataLength > this._bufferLength) {
			console.log(2)
			let tailLength = this._bufferLength - this._writePosition
			data.copy(this._buffer, this._writePosition, 0, tailLength)
			data.copy(this._buffer,0, tailLength, dataLength)
			this._dataLength += dataLength
			this._writePosition = dataLength - tailLength
		} else {
			console.log(3)
			data.copy(this._buffer, this._writePosition, 0, dataLength)
			this._writePosition += dataLength
			this._dataLength += dataLength
		}
	}

	this.getData()
}

Pin.prototype.getData = function () {
	while (true) {
		console.log(5,this._dataLength)
		if (this._dataLength < this._dataHeadLength) {
			console.log('长度不够')
			break;
		}

		if (this._bufferLength - this._readPosition < this._dataHeadLength) {

		} else {
			let headBuffer = this._buffer.slice(this._readPosition, this._readPosition + this._dataHeadLength)
			let header = headBuffer.slice(0,2).toString('hex')
			console.log(header)
			if (header === 'eb90') {
				let length = headBuffer.readUInt16LE(2)
				let crc = headBuffer.readUInt16LE(4)
				console.log(crc)
				if (this._bufferLength - this._readPosition - this._dataHeadLength < length) {
					let part1 = this._buffer.slice(this._readPosition + this._dataHeadLength)
					if (this._writePosition < this.length - part1.length) {
						break;
					} else {
						let part2 = this._buffer.slice(0, length - part1.length)
						let originData = Buffer.alloc(length)
						originData = Buffer.concat([part1,part2])
						let crc1 = crcHelper.generate(originData).readUInt16LE(0)
						if (crc1 === crc) {
							this._readPosition = part2.length
							this._dataLength -= this._dataHeadLength + length
							this._event.emit('data', originData)
						} else {
							return this._event.emit('error','error')
						}
					}
				} else {
					let originData = this._buffer.slice(this._readPosition + this._dataHeadLength, this._readPosition + this._dataHeadLength + length)
					let crc1 = crcHelper.generate(originData).readUInt16LE(0)
					if (crc1 === crc) {
						console.log(4)
						this._readPosition += this._dataHeadLength + length
						this._dataLength -= this._dataHeadLength + length
						this._event.emit('data', originData)
					} else {
						return this._event.emit('error','error')
					}
				}
			} else {
				this._readPosition ++
			}
		}
		
	}
}

Pin.prototype.getAvailableLength = function () {
	return this._bufferLength - this._dataLength
}

module.exports = exports = Pin