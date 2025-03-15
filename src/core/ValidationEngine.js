const groups = new Map()

class ValidationEngine {
    constructor() {
    }

    registerField(group, field_validator) {
        if (!groups.has(group)) groups.set(group, [])
        groups.get(group).push(field_validator)
    }

    validateGroup(group) {
        const validators = groups.get(group);
        if (!validators || !validators.length) return false;
        return validators.every(field_validator => !field_validator());
    }

}

export default ValidationEngine
