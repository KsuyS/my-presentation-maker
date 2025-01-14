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
                                        type: { const: "text" },
                                        value: { type: "string" },
                                        fontFamily: { type: "string" },
                                        fontSize: { type: "number" },
                                        fontColor: { type: "string" },
                                        textAlign: { enum: ["left", "center", "right"] },
                                        fontWeight: { enum: ["normal", "bold"] },
                                        fontStyle: { enum: ["normal", "italic"] },
                                        textDecoration: { enum: ["none", "underline"] },
                                        textCase: { enum: ["none", "capitalize", "uppercase", "lowercase"] }
                                    },
                                    required: ["id", "position", "size", "type", "value", "fontFamily", "fontSize", "fontColor", "textAlign", "fontWeight", "fontStyle", "textDecoration", "textCase"]
                                },
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
                                        type: { const: "image" },
                                        src: { type: "string" },
                                        borderStyle: {
                                            enum: [
                                                "none",
                                                "black-thick",
                                                "black-thin",
                                                "white-thick",
                                                "white-thin",
                                                "rounded-oval",
                                                "rounded-rect"
                                            ]
                                        }
                                    },
                                    required: ["id", "position", "size", "type", "src"]
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
                            },
                            {
                                type: "object",
                                properties: {
                                    type: { const: 'gradient' },
                                    gradient: { type: 'string' }
                                },
                                required: ['type', 'gradient']
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