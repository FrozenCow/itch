
import invariant from 'invariant'
import butler from '../util/butler'

export default async function apply (out, opts) {
  const {buildId, globalMarket, cave, gameId, patchPath, signaturePath, outPath} = opts
  invariant(typeof globalMarket === 'object', 'apply must have globalMarket')
  invariant(typeof cave === 'object', 'apply must have cave')
  invariant(gameId, 'apply must have gameId')
  invariant(patchPath, 'apply must have patchPath')
  invariant(signaturePath, 'apply must have signaturePath')
  invariant(outPath, 'apply must have outPath')

  await butler.apply(opts)

  globalMarket.saveEntity('caves', cave.id, {buildId})

  // alles gut!
}
