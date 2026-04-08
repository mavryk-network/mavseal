package integrationtest

import (
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestLedgerVault(t *testing.T) {

	mv1alias := "speculos"

	go SpeculosApprove()

	out, err := MavkitClient("transfer", "1", "from", mv1alias, "to", "alice", "--burn-cap", "0.06425")

	assert.NoError(t, err)
	require.Contains(t, string(out), "Operation successfully injected in the node")
}

func TestLedgerVaultGetPublicKey(t *testing.T) {
	require.Equal(t, "edpkvJkAiBX51stwvZw7jPVuKRty1hnYVPSoKXPSjkjwDhXSSjsy5n", GetPublicKey("mv1P9qQbvceP562nnjC5WXyLp9qFCRjx6Dzu"))
}
