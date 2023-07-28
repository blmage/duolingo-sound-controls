import { h } from 'preact';
import { useState } from 'preact/hooks';
import { _ } from 'one-liner.macro';
import { useDebounce } from 'preact-use';
import classNames from 'classnames';
import { PrimeIcons } from 'primereact/api';
import { Button } from 'primereact/button';
import { ToggleButton } from 'primereact/togglebutton';
import { hasObjectProperty, isNumber, noop } from 'duo-toolbox/utils/functions';
import { Slider } from './Slider';

export const SoundSettingSlider =
  (
    {
      settingParams,
      label,
      value,
      defaultValue,
      disabled = false,
      onChange = noop,
    }
  ) => {
    const [ isDragging, setIsDragging ] = useState(false);
    const [ sliderValue, setSliderValue ] = useState(null);

    const rawValue = sliderValue ?? value?.value ?? defaultValue?.value;
    const hasDefault = (null !== defaultValue);
    const isDefaulted = hasDefault && (null === value);
    const hasRelativity = hasObjectProperty(value || defaultValue, 'isRelative');
    const isRelative = hasRelativity && (value?.isRelative ?? defaultValue?.isRelative);

    const baseValue = Math.min(
      settingParams.maxValue,
      Math.max(settingParams.minValue, rawValue)
    );

    const isOutOfBounds = (rawValue < settingParams.minValue) || (rawValue > settingParams.maxValue);
    const onBaseValueChange = onChange(value && { ...value, value: _ });
    const onRelativityToggle = onChange(value && { ...value, isRelative: _ });

    useDebounce(
      () => {
        if (
          !isDragging
          && (null !== value)
          && isNumber(sliderValue)
          && (sliderValue !== value.value)
        ) {
          setSliderValue(null);
          onChange({ ...value, value: sliderValue });
        }
      },
      250,
      [ value, onChange, isDragging, sliderValue, setSliderValue ]
    );

    return (
      <div className="p-field p-grid p-ai-center">
        <h5 className="p-col-7 p-my-2 p-d-flex p-ai-center p-gap-1 p-text-nowrap">
          {label}
        </h5>

        <div className="p-col-5 p-my-2 p-d-flex p-jc-end">
          {hasRelativity && (
            <ToggleButton
              checked={isRelative}
              disabled={disabled || isDefaulted}
              onChange={onRelativityToggle(_.value)}
              onLabel=""
              offLabel=""
              onIcon={PrimeIcons.PERCENTAGE}
              offIcon={PrimeIcons.PERCENTAGE}
              tooltipOptions={{ position: 'left' }}
              tooltip={(
                isRelative
                  ? 'Click to ignore the original setting (generally not recommended).'
                  : 'Click to combine the original setting with yours (generally recommended).'
              )}
            />
          )}

          {hasDefault && (
            <ToggleButton
              checked={isDefaulted}
              disabled={disabled}
              onChange={onChange(_.value ? null : { ...defaultValue })}
              onLabel=""
              offLabel=""
              onIcon={PrimeIcons.PAPERCLIP}
              offIcon={PrimeIcons.PAPERCLIP}
              tooltipOptions={{ position: 'left' }}
              tooltip={(
                isDefaulted
                  ? 'Click to use a custom setting for this context.'
                  : 'Click to use the default setting for this context.'
              )}
            />
          )}
        </div>

        <div className="p-col-10 p-relative p-d-flex p-ai-center">
          <Button
            disabled={disabled || isDefaulted}
            title={settingParams.minButtonTitle}
            icon={`pi ${settingParams.minIcon}`}
            className="p-button-rounded p-button-text p-button-plain"
            onClick={() => onBaseValueChange(settingParams.minButtonValue || settingParams.minValue)}
          />

          <Slider
            min={settingParams.minValue}
            max={settingParams.maxValue}
            step={settingParams.step}
            value={baseValue}
            disabled={disabled || isDefaulted}
            onChange={setSliderValue(_.value)}
            onSlideStart={() => setIsDragging(true)}
            onSlideEnd={() => setIsDragging(false)}
            className={classNames({ 'p-slider-oob': isOutOfBounds })}
          />

          {isOutOfBounds && (
            <div className="p-slider-oob-value">
              Current: {(rawValue * settingParams.displayScale).toLocaleString()}{settingParams.displaySuffix}
            </div>
          )}

          <Button
            disabled={disabled || isDefaulted}
            title={settingParams.maxButtonTitle}
            icon={`pi ${settingParams.maxIcon}`}
            className="p-button-rounded p-button-text p-button-plain"
            onClick={() => onBaseValueChange(settingParams.maxButtonValue || settingParams.maxValue)}
          />
        </div>

        <div className="p-col-2 p-text-right">
          {(baseValue * settingParams.displayScale).toLocaleString()}{settingParams.displaySuffix}
        </div>
      </div>
    );
  };
