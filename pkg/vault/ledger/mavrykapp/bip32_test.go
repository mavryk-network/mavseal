package mavrykapp

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestBIP32(t *testing.T) {
	buf := []byte{0x04, 0x80, 0x00, 0x00, 0x2c, 0x80, 0x00, 0x07, 0xb1, 0x80, 0x00, 0x00, 0x00, 0x80, 0x00, 0x00, 0x00}
	bip := BIP32FromBytes(buf)
	assert.Equal(t, BIP32{0x8000002c, 0x800007b1, 0x80000000, 0x80000000}, bip)

	str := bip.String()
	assert.Equal(t, "44'/1969'/0'/0'", str)

	bip2 := ParseBIP32(str)
	assert.Equal(t, bip, bip2)

	buf2 := bip2.Bytes()
	assert.Equal(t, buf, buf2)
}
