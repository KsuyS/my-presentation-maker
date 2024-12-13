import Ajv from 'ajv';

const presentationSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        slides: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    id: { type: "string" },
                    content: {
                        type: "array",
                        items: {
                            oneOf: [
                                {
                                    type: "object",
                                    properties: {
                                        id: { type: "string" },
                                        position: {
                                            type: "object",
                                            properties: {
                                                x: { type: "number" },
                                                y: { type: "number" }
                                            },
                                            required: ["x", "y"]
                                        },
                                        size: {
                                            type: "object",
                                            properties: {
                                                width: { type: "number" },
                                                height: { type: "number" }
                                            },
                                            required: ["width", "height"]
                                        },
                                        type: { enum: ["text", "image"] },
                                    },
                                    required: ["id", "position", "size", "type"],
                                }
                            ]
                        }
                    },
                    background: {
                        oneOf: [
                            {
                                type: "object",
                                properties: {
                                    type: { const: 'solid' },
                                    color: { type: 'string' }
                                },
                                required: ['type', 'color']
                            },
                            {
                                type: "object",
                                properties: {
                                    type: { const: 'image' },
                                    src: { type: 'string' }
                                },
                                required: ['type', 'src']
                            }
                        ]
                    }
                },
                required: ["id", "content", "background"]
            }
        }
    },
    required: ["title", "slides"]
};

const ajv = new Ajv();
const validate = ajv.compile(presentationSchema);

export { validate };