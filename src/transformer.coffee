class Transformer

  constructor: ( transformation ) ->
    @_transformation = transformation


  transform: ( signal ) ->
    newSignal = new Signal()

    signal.forEach ( value ) =>
      newValue = @_transformation(value)
      newSignal.set(newValue)

    return newSignal

