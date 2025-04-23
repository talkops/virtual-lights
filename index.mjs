import { Extension, Parameter } from 'talkops'

const states = new Map()

const names = new Parameter('LIGHT_NAMES')
  .setDescription('The names of the lights.')
  .setDefaultValue('Desk lamp,Bedroom ceiling light')

const extension = new Extension()
  .setName('Virtual Lights')
  .setIcon('https://talkops.app/images/extensions/virtual-lights.png')
  .setCategory('home_automation')
  .setDemo(true)
  .setFeatures(['Turn on/off virtual lights'])
  .setParameters([names])
  .setFunctionSchemas([
    {
      name: 'update_lights',
      description: 'Update lights',
      parameters: {
        type: 'object',
        properties: {
          action: {
            type: 'string',
            enum: ['on', 'off'],
            description: 'The desired action',
          },
          names: {
            type: 'array',
            description: 'The light names',
            items: {
              type: 'string',
            },
          },
        },
        required: ['action', 'names'],
      },
    },
  ])
  .setFunctions([
    function update_lights(names, action) {
      for (const name of names) {
        states.set(name, action)
      }
      return 'Done.'
    },
  ])
  .setBootstrap(loop)

function loop() {
  const lights = []
  for (const name of names.getValue().split(',')) {
    if (!states.has(name)) states.set(name, 'off')
    lights.push(`"${name}" (${states.get(name)})`)
  }
  extension.setInstructions(
    `You are a home automation assistant, you can manage the lights: ${lights.join(', ')}.`,
  )
  setTimeout(loop, 1000)
}
